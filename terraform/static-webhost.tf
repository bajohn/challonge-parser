

resource "aws_s3_bucket" "static-webhost-bucket" {
  bucket = "summit-tournament-webhost-bucket"

  tags = {
    Name        = "Summit Tournament Webhost Bucket"
  }
}



# TODO - Create cloudfront distribution for better hosting 
# Using index.html as a redirect to errors is not ideal
resource "aws_s3_bucket_website_configuration" "webhost-config" {
  bucket = aws_s3_bucket.static-webhost-bucket.id

  index_document {
    suffix = "index.html"
  }

  # TODO - this is a hack, a 404 is still returned to the browser 
  error_document {
    key = "index.html"
  }

  # routing_rule {
  #   condition {
  #     key_prefix_equals = "page"
  #   }
  #   redirect {
  #     replace_key_with = ""
  #   }
  # }

}


resource "aws_s3_bucket_policy" "allow-public-access" {
  bucket = aws_s3_bucket.static-webhost-bucket.id
  policy = data.aws_iam_policy_document.public-access.json
  depends_on = [
    aws_s3_bucket.static-webhost-bucket,
    aws_s3_bucket_public_access_block.allow-public-access
  ]
}


resource "aws_s3_bucket_public_access_block" "allow-public-access" {
  bucket = aws_s3_bucket.static-webhost-bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
  depends_on = [
    aws_s3_bucket.static-webhost-bucket,
  ]
}



data "aws_iam_policy_document" "public-access" {
  statement {
    principals {
      type        = "*"
      identifiers = ["*"]
    }


    actions = [
      "s3:GetObject",
    ]

    resources = [
      "${aws_s3_bucket.static-webhost-bucket.arn}/*",
    ]
  }
}