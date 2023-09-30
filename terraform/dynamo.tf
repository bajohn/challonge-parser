
resource "aws_dynamodb_table" "summit-podium" {
  name           = "PodiumFinishes"
  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "podiumFinishes"

  attribute {
    name = "podiumFinishes"
    type = "S"
  }

  tags = {
    Name        = "Podium Finishes"
  }
}

