CREATE TABLE "todolist" (
    "id" SERIAL PRIMARY KEY,
    "task_is_high_priority" BOOLEAN DEFAULT FALSE,
    "task_is_complete" BOOLEAN DEFAULT FALSE,
    "task" VARCHAR(800) NOT NULL
);

INSERT INTO "todolist"
    ("task_is_high_priority", "task_is_complete", "task")
VALUES
    (TRUE, FALSE, 'Complete weekend to-do list web application assignment.'),
    (TRUE, TRUE, 'Take a break outside and go for a walk.'),
    (FALSE, FALSE, 'Watch only TWO episodes of true-crime to avoid spiraling into questioning humanity''s goodness.'),
    (FALSE, TRUE, 'Reward my wonderful cats with treats as compensation for spending less time brushing them lately.');