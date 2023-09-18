
provider "aws" {
  region = "us-west-2"
  profile = "summit"
}



terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~>5.0"
    }
  }
  backend "s3" {
    bucket = "summit-tf-backend"
    key    = "root"
    region = "us-west-2"
}
}
