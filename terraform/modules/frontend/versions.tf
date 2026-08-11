terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
      # ACM certs for CloudFront must live in us-east-1 regardless of the app's
      # main region — the root module passes that aliased provider in explicitly.
      configuration_aliases = [aws.us_east_1]
    }
  }
}
