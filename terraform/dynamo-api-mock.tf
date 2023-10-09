# Some table(s) to store API responses,
# for use in testing 

resource "aws_dynamodb_table" "summit-api-mock" {
  name           = "SummitAPIMock"
  billing_mode   = "PROVISIONED"
  read_capacity  = 5
  write_capacity = 5
  hash_key       = "url"

  attribute {
    name = "url"
    type = "S"
  }

  tags = {
    Name        = "Summit API Mock"
  }
}