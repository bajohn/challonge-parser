resource "aws_apigatewayv2_api" "summit-api" {
  name                       = "Summit API"
  protocol_type              = "HTTP"
  # route_selection_expression = "$request.body.action"
  description                = "Summit Pool Tournament REST API."
}

resource "aws_iam_role" "iam_for_summit_apigw" {
  name = "iam_for_summit_apigw"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "apigateway.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}
# Allows API GW to invoke lambda
resource "aws_iam_role_policy_attachment" "summit-apigw-role-attachment" {
  role       =  aws_iam_role.iam_for_summit_apigw.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaRole"
}

resource "aws_apigatewayv2_deployment" "summit-deployment" {
  api_id      = aws_apigatewayv2_api.summit-api.id
  description = "Pool tourney deployment"
  triggers = {
    redeployment = timestamp()
  }

  depends_on = [
    aws_apigatewayv2_stage.summit-stage,
    aws_lambda_function.summit-api
  ]

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_apigatewayv2_stage" "summit-stage" {
  api_id = aws_apigatewayv2_api.summit-api.id
  name   = "summit-stage"
  default_route_settings {
    logging_level="INFO"
    throttling_rate_limit=1000
    throttling_burst_limit = 5000
  }
}

resource "aws_apigatewayv2_route" "default-route" {
  api_id    = aws_apigatewayv2_api.summit-api.id
  route_key = "$default"
  target = "integrations/${aws_apigatewayv2_integration.default-integration.id}"
}

resource "aws_apigatewayv2_integration" "default-integration" {
  api_id           = aws_apigatewayv2_api.summit-api.id

  # content_handling_strategy = "CONVERT_TO_TEXT"
  description               = "Default Lambda Integration"
  integration_method        = "POST"
  integration_uri           = aws_lambda_function.summit-api.invoke_arn
  credentials_arn           = aws_iam_role.iam_for_summit_apigw.arn
  integration_type           = "AWS_PROXY"
  # passthrough_behavior      = "WHEN_NO_MATCH"
}

resource "aws_apigatewayv2_route" "default" {
  api_id    = aws_apigatewayv2_api.summit-api.id
  route_key = "ANY /{proxy+}"

  target = "integrations/${aws_apigatewayv2_integration.default-integration.id}"
}