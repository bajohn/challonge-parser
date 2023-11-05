# Clean out last deployment
rm -r ./src-lambda/artifacts/tsout
rm src-lambda/artifacts/lambda_function_payload.zip

# Upload lambda code 
cd src-lambda
npx tsc 
cd artifacts/tsout
zip -r ../lambda_function_payload.zip  ./  # -x test/

# Update Terraform, which updates API
cd ../../../terraform
terraform apply -auto-approve

# Update front end
cd ../src-webpage/summit 
npm run build
aws s3 cp --recursive build s3://summit-tournament-webhost-bucket

