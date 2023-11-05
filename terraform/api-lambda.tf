

locals {
  code-location =  "../src-lambda/artifacts/lambda_function_payload.zip"
}


resource "aws_lambda_function" "summit-api" {
  filename      = local.code-location
  function_name = "summit-api"
  role          = aws_iam_role.iam_for_summit_lambda.arn
  handler       = "src-lambda/entrypoints/api-entry.apiHandler"

  source_code_hash = filebase64sha256(local.code-location)

  runtime = "nodejs18.x"
  timeout = 300
}

# Runs on timer, only updates when needed
resource "aws_lambda_function" "summit-timed-dynamo-updater" {
  filename      = local.code-location
  function_name = "summit-timed-dynamo-updater"
  role          = aws_iam_role.iam_for_summit_lambda.arn
  handler       = "src-lambda/entrypoints/timed-dynamo-updater.updaterHandler"

  source_code_hash = filebase64sha256(local.code-location)

  runtime = "nodejs18.x"
  timeout = 300
}

# Invoked, forces update
resource "aws_lambda_function" "summit-invoked-dynamo-updater" {
  filename      = local.code-location
  function_name = "summit-invoked-dynamo-updater"
  role          = aws_iam_role.iam_for_summit_lambda.arn
  handler       = "src-lambda/entrypoints/invoked-dynamo-updater.updaterHandler"

  source_code_hash = filebase64sha256(local.code-location)

  runtime = "nodejs18.x"
  timeout = 300
}

resource "aws_cloudwatch_event_rule" "dynamo-updater-schedule" {
  name                = "dynamo-updater-schedule"
  description         = "Dynamo Updater Schedule"
  schedule_expression = "rate(2 minutes)"
}

resource "aws_cloudwatch_event_target" "dynamo-updater-target" {
  arn       =  aws_lambda_function.summit-timed-dynamo-updater.arn
  rule      = aws_cloudwatch_event_rule.dynamo-updater-schedule.name
}

resource "aws_lambda_permission" "allow_cloudwatch_to_call_lambda" {
    statement_id = "AllowExecutionFromCloudWatch"
    action = "lambda:InvokeFunction"
    function_name = aws_lambda_function.summit-timed-dynamo-updater.arn
    principal = "events.amazonaws.com"
    source_arn = aws_cloudwatch_event_rule.dynamo-updater-schedule.arn
}


resource "aws_iam_role" "iam_for_summit_lambda" {
  name = "iam_for_summit_lambda"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "summit-api-lambda-dynamo-role-attachment" {
  role       = aws_iam_role.iam_for_summit_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
}

# Allow API lambda to invoke other lambdas
resource "aws_iam_role_policy_attachment" "summit-api-lambda-invoke-role-attachment" {
  role       = aws_iam_role.iam_for_summit_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaRole"
}

resource "aws_iam_role_policy_attachment" "summit-api-lambda-execution-role-attachment" {
  role       = aws_iam_role.iam_for_summit_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}
