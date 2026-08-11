terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.region
}

# CloudFront's ACM certificate must be requested in us-east-1, no matter what
# region the rest of this app's infra lives in.
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}

module "frontend" {
  source = "./modules/frontend"
  providers = {
    aws           = aws
    aws.us_east_1 = aws.us_east_1
  }

  app_name             = var.app_name
  environment          = var.environment
  bucket_name          = var.bucket_name
  domain_name          = var.domain_name
  hosted_zone_id       = var.hosted_zone_id
  backend_nlb_arn      = var.backend_nlb_arn
  backend_nlb_dns_name = var.backend_nlb_dns_name
}
