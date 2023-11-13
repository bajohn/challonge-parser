
resource "aws_dynamodb_table" "summit-podium" {
  name           = "SummitPodiumFinishes"
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


resource "aws_dynamodb_table" "summit-h2h" {
  name           = "SummitH2H"
  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "playerName"

  attribute {
    name = "playerName"
    type = "S"
  }

  tags = {
    Name        = "Summit Head-to-Head"
  }
}

resource "aws_dynamodb_table" "summit-players" {
  name           = "SummitPlayers"
  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "playerName"

  attribute {
    name = "playerName"
    type = "S"
  }

  tags = {
    Name        = "Summit Players"
  }
}

resource "aws_dynamodb_table" "summit-tourneys" {
  name           = "SummitTourneys"
  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "tourneyID"

  attribute {
    name = "tourneyID"
    type = "S"
  }

  tags = {
    Name        = "Summit Tournaments"
  }
}


// Store key/val metadata in a table
resource "aws_dynamodb_table" "summit-metadata" {
  name           = "SummitMetadata"
  billing_mode   = "PROVISIONED"
  read_capacity  = 5
  write_capacity = 1
  hash_key       = "key"

  attribute {
    name = "key"
    type = "S"
  }

  tags = {
    Name        = "Summit Metadata"
  }
}