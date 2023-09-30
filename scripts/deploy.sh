cd lambda-src
rm  ../artifacts/lambda_function_payload.zip 
zip -r ../artifacts/lambda_function_payload.zip  .
cd ../terraform
terraform apply -auto-approve
cd ..
aws s3 cp webpage-src/index.html s3://summit-tournament-webhost-bucket/index.html
