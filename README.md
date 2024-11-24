##  AWS Security Logs and Alerts Project

# Overview
This project leverages AWS services to monitor security logs, detect suspicious activity, and alert administrators when security-related incidents are detected. It integrates AWS CloudTrail, CloudWatch, Lambda Functions, and SNS for real-time monitoring, alerting, and automation.

The main objectives of the project are:

Set up CloudTrail to capture and store security logs.

Create CloudWatch Logs to track suspicious or failed activities.

Implement Lambda functions to automatically respond to specific log patterns (e.g., suspicious IPs, failed logins).

Set up CloudWatch Alarms to notify administrators of critical issues.

Deploy CloudWatch Dashboards for visual monitoring of security metrics.

# Project Components
1. CloudTrail
   
CloudTrail captures API activity from all services in your AWS account. We have set up a multi-region CloudTrail trail to log security-related events across the organization.

Logs are stored in an S3 bucket for easy access and analysis.

Key Settings:

Trail name: security-trail

Log file SSE-KMS encryption enabled for added security.

Logs stored in S3 bucket: security-trail-logs

2. CloudWatch Logs and Metrics

CloudWatch Logs are set up to collect and monitor security logs from CloudTrail.

Metrics are configured to track events such as:

Failed login attempts (failedlogs).

Warning messages (warnings).

Metric Filters:

failedlogs: Triggers on events like AccessDenied.

warnings: Captures log messages containing the keyword "Warning:".

3. CloudWatch Alarms
   
CloudWatch Alarms are created for each metric to monitor thresholds and notify administrators in case of issues.

Alarm triggers:

failedlogs: Alert on multiple failed login attempts.

warnings: Alert when there are too many warning messages in the logs.

4. Lambda Functions
   
Lambda functions are used to automate the response to specific security events. The following functions are included:

detect_suspicious_ips.py: Detects and logs suspicious IP addresses.


block_ips.py: Blocks identified suspicious IPs using security groups.

notify_admin.py: Sends notifications to administrators via SNS for critical events.

These Lambda functions are triggered by CloudWatch Logs or CloudTrail events.


5. CloudWatch Dashboards
   
Dashboards are set up to provide a real-time visual representation of security metrics. This includes metrics like failed login attempts and warning messages, as well as general system health.


