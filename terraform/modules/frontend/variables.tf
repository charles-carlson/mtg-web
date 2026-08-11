variable "app_name" {
  type        = string
  description = "Application name, used for naming CloudFront/OAC resources"
}

variable "environment" {
  type        = string
  description = "Deployment environment"
}

variable "bucket_name" {
  type        = string
  description = "Globally-unique S3 bucket name that will hold the built Angular app (dist/)"
}

variable "domain_name" {
  type        = string
  default     = ""
  description = "Custom domain for the frontend (e.g. mtg.example.com). Leave empty to skip ACM/Route53 and use the CloudFront default *.cloudfront.net domain."
}

variable "hosted_zone_id" {
  type        = string
  default     = ""
  description = "Route53 hosted zone ID for domain_name. Required only when domain_name is set."
}

variable "backend_nlb_arn" {
  type        = string
  description = "ARN of the backend's internal NLB (mtg-grpc/terraform output: nlb_arn) — CloudFront reaches it via a VPC origin, never over the public internet"
}

variable "backend_nlb_dns_name" {
  type        = string
  description = "DNS name of the backend's internal NLB (mtg-grpc/terraform output: nlb_dns_name)"
}

variable "backend_port" {
  type        = number
  default     = 50051
  description = "Port the backend's Connect/gRPC server listens on"
}
