output "bucket_name" {
  value = module.frontend.bucket_name
}

output "distribution_id" {
  value = module.frontend.distribution_id
}

output "distribution_domain_name" {
  description = "Visit this over HTTPS to confirm the deploy — works even before you set up a custom domain"
  value       = module.frontend.distribution_domain_name
}
