CREATE TABLE "todolist" (
    "id" SERIAL PRIMARY KEY,
    "task_is_complete" BOOLEAN DEFAULT FALSE,
    "task" VARCHAR(800) NOT NULL
);

INSERT INTO "todolist"
    ("task_is_complete", "task")
VALUES
    (FALSE, 'Complete weekend to-do list web application assignment.'),
    (TRUE, 'Take a break outside and go for a walk.'),
    (FALSE, 'Watch only TWO episodes of true-crime to avoid spiraling into questioning humanity''s goodness.'),
    (TRUE, 'Reward my wonderful cats with treats as compensation for spending less time brushing them lately.');