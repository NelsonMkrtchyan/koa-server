import {Sequelize, DataTypes} from 'sequelize';
import path from 'path';
import {glob} from 'glob';
import Router from "koa-router";

const sequelize = new Sequelize(
    process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/venews'
);

export const testConnection = async () => {
    try {
        await console.log('process.env.DATABASE_URL', process.env.DATABASE_URL)
        await sequelize.authenticate();
        console.log('Connection has been established successfully.', process.env.DATABASE_URL);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}


const DATE_DIFF_FUNCTION = `
CREATE OR REPLACE FUNCTION date_diff (units VARCHAR(30), start_t TIMESTAMP with time zone, end_t TIMESTAMP with time zone)
RETURNS INT AS $$
DECLARE
diff_interval INTERVAL;
diff INT = 0;
years_diff INT = 0;
BEGIN
IF units IN ('yy', 'yyyy', 'year', 'mm', 'm', 'month') THEN
  years_diff = DATE_PART('year', end_t) - DATE_PART('year', start_t);

  IF units IN ('yy', 'yyyy', 'year') THEN
    -- SQL Server does not count full years passed (only difference between year parts)
    RETURN years_diff;
  ELSE
    -- If end month is less than start month it will subtracted
    RETURN years_diff * 12 + (DATE_PART('month', end_t) - DATE_PART('month', start_t));
  END IF;
END IF;

-- Minus operator returns interval 'DDD days HH:MI:SS'
diff_interval = end_t - start_t;

diff = diff + DATE_PART('day', diff_interval);

IF units IN ('wk', 'ww', 'week') THEN
  diff = diff/7;
  RETURN diff;
END IF;

IF units IN ('dd', 'd', 'day') THEN
  RETURN diff;
END IF;

diff = diff * 24 + DATE_PART('hour', diff_interval);

IF units IN ('hh', 'hour') THEN
   RETURN diff;
END IF;

diff = diff * 60 + DATE_PART('minute', diff_interval);

IF units IN ('mi', 'n', 'minute') THEN
   RETURN diff;
END IF;

diff = diff * 60 + DATE_PART('second', diff_interval);

RETURN diff;
END;
$$ LANGUAGE plpgsql;
`;

export const GET_CURRENT_SCORE_FUNCTION = `
CREATE OR REPLACE FUNCTION get_current_score (baseline jsonb, db_last_score double precision, db_last_score_time timestamp with time zone, timezone varchar(30))
RETURNS float AS $$
DECLARE
  current_score float;
  last_score float;
  last_score_time timestamp with time zone;
  next_hour timestamp with time zone;
  next_base_score float;
  now timestamp with time zone;
   BEGIN

      now := now() at time zone timezone;

      if db_last_score is null or date_trunc('hour', now) != date_trunc('hour', db_last_score_time at time zone timezone ) then
        last_score := baseline -> date_part('dow', now)::varchar->'scores' -> to_char(now , 'HH24') -> 'score';
        last_score_time = date_trunc('hour', now);
      else
        last_score_time := db_last_score_time;
        last_score := db_last_score;
      end if;

      -- return date_part('hour', last_score_time);

    next_hour := date_trunc('hour', now + '1 hour');
    next_base_score := baseline -> date_part('dow', next_hour)::varchar->'scores' -> to_char(next_hour , 'HH24') -> 'score';

    current_score = last_score + (next_base_score - last_score) * (date_diff('minute', last_score_time, now)) / (date_diff('minute', last_score_time, next_hour));



      RETURN current_score;
   END; $$ LANGUAGE plpgsql;
`;

export async function createDBFunctions() {
    // await sequelize.query(DATE_DIFF_FUNCTION);
    // await sequelize.query(GET_CURRENT_SCORE_FUNCTION);
}

export async function initDb() {
    try {
        return new Promise(async (res, rej) => {
            const models = await glob('models/*.ts', {cwd: path.join(__dirname)});
            console.log('models', models);
            const modelsCollection: any = {};
            for (const model of models) {
                console.log('model', model);
                const modelName = model.match(/([a-zA-Z]*)\.ts/)![1];
                console.log('modelName', modelName)
                // modelsCollection[modelName] = sequelize?.import(path.join(__dirname, model));
                // modelsCollection[modelName] = require(path.join(__dirname,  model));
                // eslint-disable-next-line
                // console.log('(path.join(__dirname, model)', path.join(__dirname, model));
                // modelsCollection[modelName] = require(path.join(__dirname, model))
            }
            console.log('modelsCollection', modelsCollection);
            return res(modelsCollection);
        })
    } catch (err) {
        console.error(err);
    }
}

export default sequelize;
