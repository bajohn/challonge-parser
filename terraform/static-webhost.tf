

resource "aws_s3_bucket" "static-webhost-bucket" {
  bucket = "summit-tournament-webhost-bucket"

  tags = {
    Name        = "Summit Tournament Webhost Bucket"
  }
}




resource "aws_s3_bucket_website_configuration" "webhost-config" {
  bucket = aws_s3_bucket.static-webhost-bucket.id

  index_document {
    suffix = "index.html"
  }

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