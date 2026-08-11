variable "region" {
  description = "AWS region for the S3 bucket (CloudFront itself is global)"
  type        = string
  default     = "us-west-1"
}

variable "app_name" {
  description = "Application name"
  type        = string
  default     = "mtg-web"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "dev"
}

variable "bucket_name" {
  description = "Globally-unique S3 bucket name for the built Angular app"
  type        = string
}

variable "domain_name" {
  description = "Custom domain for the frontend (e.g. mtg.example.com). Leave empty to skip ACM/Route53 for now."
  type        = string
  default     = ""
}

variable "hosted_zone_id" {
  description = "Route53 hosted zone ID for domain_name. Required only when domain_name is set."
  type        = string
  default     = ""
}

variable "backend_nlb_arn" {
  description = "From mtg-grpc/terraform: `terraform output nlb_arn`"
  type        = string
}

variable "backend_nlb_dns_name" {
  description = "From mtg-grpc/terraform: `terraform output nlb_dns_name`"
  type        = string
}
