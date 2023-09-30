cd lambda-src
rm  ../artifacts/lambda_function_payload.zip 
zip -r ../artifacts/lambda_function_payload.zip  .
cd ../terraform
terraform apply -auto-approve
cd ../webpage-src/summit 
npm run build
aws s3 cp --recursive build s3://summit-tournament-webhost-bucket

