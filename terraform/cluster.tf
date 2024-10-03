
provider "google" {
  project     = var.project_id
  region      = var.region
  zone        = var.zone
}

resource "google_artifact_registry_repository" "my_repo" {
  location         = var.region
  repository_id    = "devops-assignment"
  description      = "example docker repository"
  format           = "DOCKER"
}

# VPC network
resource "google_compute_network" "default" {
  name = "example-network"
  auto_create_subnetworks  = false
  enable_ula_internal_ipv6 = true
}

# Create a subnet
resource "google_compute_subnetwork" "default" {
  name = "example-subnetwork"

  ip_cidr_range = "10.0.0.0/16"
  region        = "us-central1"

  stack_type       = "IPV4_IPV6"
  ipv6_access_type = "INTERNAL"

  network = google_compute_network.default.id
  secondary_ip_range {
    range_name    = "services-range"
    ip_cidr_range = "192.168.0.0/24"
  }

  secondary_ip_range {
    range_name    = "pod-ranges"
    ip_cidr_range = "192.168.1.0/24"
  }
}


resource "google_container_cluster" "default" {
  name = "example-autopilot-cluster"

  location                 = var.region
  enable_autopilot         = true
  enable_l4_ilb_subsetting = true

  network    = google_compute_network.default.id
  subnetwork = google_compute_subnetwork.default.id

  ip_allocation_policy {
    stack_type                    = "IPV4_IPV6"
    services_secondary_range_name = google_compute_subnetwork.default.secondary_ip_range[0].range_name
    cluster_secondary_range_name  = google_compute_subnetwork.default.secondary_ip_range[1].range_name
  }

  # Set `deletion_protection` to `true` will ensure that one cannot
  # accidentally delete this instance by use of Terraform.
  deletion_protection = false
}
