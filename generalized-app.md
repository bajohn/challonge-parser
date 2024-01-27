
# Generalizing this app pattern

A long-term TODO is to eject a web app stack using the pattern from this project. This would contain:

- React stack
    - Typescript compilation
    - Create React App boilerplate and Router
    - Bare minimum hello world pages - homepage, one subpage, and a not found page
    - Minimal Cypress component test running on one of these.
- API stack
    - Lambda JS code compilation via typescript
    - Router for incoming api paths -> JS handlers
    - Bare minimum hello world event handler (one lambda handler that routes these requests)
    - Dynamo sample read / write
    - Jest test running on this minimal handler
- Terraform
    - API Gateway boilerplate for one endpoint
    - One Dynamo table - something generic like "user profiles"
    - S3 webhost configuration
- Scripts
    - Deployment script that updates all the above!