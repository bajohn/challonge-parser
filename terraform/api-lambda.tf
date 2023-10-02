
resource "aws_lambda_function" "summit-api" {
  filename      = "../artifacts/lambda_function_payload.zip"
  function_name = "summit-api"
  role          = aws_iam_role.iam_for_summit_api_lambda.arn
  handler       = "entrypoints/api-lambda.handler"

  source_code_hash = filebase64sha256( "../artifacts/lambda_function_payload.zip")

  runtime = "nodejs18.x"
  timeout = 300
}


resource "aws_lambda_function" "summit-dynamo-updater" {
  filename      = "../artifacts/lambda_function_payload.zip"
  function_name = "summit-dynamo-updater"
  role          = aws_iam_role.iam_for_summit_api_lambda.arn
  handler       = "entrypoints/dynamo-updater.handler"

  source_code_hash = filebase64sha256( "../artifacts/lambda_function_payload.zip")

  runtime = "nodejs18.x"
  timeout = 300
}

resource "aws_iam_role" "iam_for_summit_api_lambda" {
  name = "iam_for_summit_api_lambda"

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

resource "aws_iam_policy_attachment" "summit-lambda-dynamo-attachment" {
  name       = "summit-lambda-dynamo-attachment"
  roles      = [aws_iam_role.iam_for_summit_api_lambda.name]
  policy_arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
}

resource "aws_iam_policy_attachment" "summit-lambda-execution-attachment" {
  name       = "summit-lambda-execution-attachment"
  roles      = [aws_iam_role.iam_for_summit_api_lambda.name]
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}
