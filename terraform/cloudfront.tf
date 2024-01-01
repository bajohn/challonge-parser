# resource "aws_s3_bucket" "b" {
#   bucket = "mybucket"

#   tags = {
#     Name = "My bucket"
#   }
# }

# resource "aws_s3_bucket_acl" "b_acl" {
#   bucket = aws_s3_bucket.b.id
#   acl    = "private"
# }

locals {
  s3_origin_id = "summit-s3-origin"
  domain-name = "summit-pool.com"
}

resource "aws_cloudfront_distribution" "s3-distribution" {
  origin {
    domain_name              = aws_s3_bucket.static-webhost-bucket.bucket_regional_domain_name
    # origin_access_control_id = aws_cloudfront_origin_access_control.default.id
    origin_id                = local.s3_origin_id
  }
  aliases = ["summit-pool.com"]

  enabled             = true
  is_ipv6_enabled     = true
#   comment             = "Some comment"
  default_root_object = "index.html"

#   logging_config {
#     include_cookies = false
#     bucket          = "mylogs.s3.amazonaws.com"
#     prefix          = "myprefix"
#   }

#   aliases = ["mysite.example.com", "yoursite.example.com"]

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id

    # forwarded_values {
    #   query_string = true

    #   cookies {
    #     forward = "none"
    #   }
    # }
    cache_policy_id="4135ea2d-6df8-44a3-9df3-4b5a84be39ad"

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  # Cache behavior with precedence 0
#   ordered_cache_behavior {
#     path_pattern     = "/content/immutable/*"
#     allowed_methods  = ["GET", "HEAD", "OPTIONS"]
#     cached_methods   = ["GET", "HEAD", "OPTIONS"]
#     target_origin_id = local.s3_origin_id

#     forwarded_values {
#       query_string = false
#       headers      = ["Origin"]

#       cookies {
#         forward = "none"
#       }
#     }

#     min_ttl                = 0
#     default_ttl            = 86400
#     max_ttl                = 31536000
#     compress               = true
#     viewer_protocol_policy = "redirect-to-https"
#   }

#   # Cache behavior with precedence 1
#   ordered_cache_behavior {
#     path_pattern     = "/content/*"
#     allowed_methods  = ["GET", "HEAD", "OPTIONS"]
#     cached_methods   = ["GET", "HEAD"]
#     target_origin_id = local.s3_origin_id

#     forwarded_values {
#       query_string = false

#       cookies {
#         forward = "none"
#       }
#     }

#     min_ttl                = 0
#     default_ttl            = 3600
#     max_ttl                = 86400
#     compress               = true
#     viewer_protocol_policy = "redirect-to-https"
#   }

#   price_class = "PriceClass_200"

  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations        = []
    }
  }

#   tags = {
#     Environment = "production"
#   }

  viewer_certificate {
    # cloudfront_default_certificate = true
    acm_certificate_arn = data.aws_acm_certificate.summit-cert-east.arn
    ssl_support_method = "sni-only"
  }
}


# data "aws_acm_certificate" "summit-cert" {
#   domain      = local.domain-name
# }

# AWS requires ACM cert to be located in us-east-1
# https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cnames-and-https-requirements.html
# This was made manually in AWS console, in addition to 
# registering the domain name
data "aws_acm_certificate" "summit-cert-east" {
  provider = aws.us-east-1
  domain      = local.domain-name
}

resource "aws_route53_zone" "website_zone" {
  name    =  local.domain-name
}


resource "aws_route53_record" "website_record_a" {
  zone_id = aws_route53_zone.website_zone.zone_id
  name    =  local.domain-name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.s3-distribution.domain_name
    zone_id                = aws_cloudfront_distribution.s3-distribution.hosted_zone_id 
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "website_record_aaaa" {
  zone_id = aws_route53_zone.website_zone.zone_id
  name    = local.domain-name
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.s3-distribution.domain_name
    zone_id                = aws_cloudfront_distribution.s3-distribution.hosted_zone_id 
    evaluate_target_health = false
  }
}