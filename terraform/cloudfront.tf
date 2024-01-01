locals {
  s3_origin_id = "summit-s3-origin"
  domain-name = "summit-pool.com"
  zone-id = "Z101285611VIEMAAEIILX"
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

  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations        = []
    }
  }

  viewer_certificate {
    acm_certificate_arn = data.aws_acm_certificate.summit-cert-east.arn
    ssl_support_method = "sni-only"
  }

  # This makes React routing work:
  custom_error_response {
    # error_caching_min_ttl = 300
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
  }

  custom_error_response {
    # error_caching_min_ttl = 300
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }

}


# AWS requires ACM cert to be located in us-east-1
# https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cnames-and-https-requirements.html
# This was made manually in AWS console, in addition to 
# registering the domain name
data "aws_acm_certificate" "summit-cert-east" {
  provider = aws.us-east-1
  domain      = local.domain-name
}

# AWS creates this when registering the domain name:
data "aws_route53_zone" "website_zone" {
    zone_id = local.zone-id
}

resource "aws_route53_record" "website_record_a" {
  zone_id = local.zone-id
  name    =  local.domain-name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.s3-distribution.domain_name
    zone_id                = aws_cloudfront_distribution.s3-distribution.hosted_zone_id 
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "website_record_aaaa" {
  zone_id = local.zone-id
  name    = local.domain-name
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.s3-distribution.domain_name
    zone_id                = aws_cloudfront_distribution.s3-distribution.hosted_zone_id 
    evaluate_target_health = false
  }
}