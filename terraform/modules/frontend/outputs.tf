output "bucket_name" {
  description = "S3 bucket holding the built Angular app — sync dist/ here on deploy"
  value       = aws_s3_bucket.frontend.bucket
}

output "distribution_id" {
  description = "CloudFront distribution ID — needed to invalidate the cache after each deploy"
  value       = aws_cloudfront_distribution.frontend.id
}

output "distribution_domain_name" {
  description = "CloudFront's own domain (*.cloudfront.net) — usable immediately, even without domain_name set"
  value       = aws_cloudfront_distribution.frontend.domain_name
}
