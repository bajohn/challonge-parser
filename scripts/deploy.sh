cd src
rm  ../artifacts/lambda_function_payload.zip 
zip -r ../artifacts/lambda_function_payload.zip  .
cd ../terraform
terraform apply -auto-approve