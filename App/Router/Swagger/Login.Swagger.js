/**
 * @swagger 
 *  components:
 *      schemas:
 *          Register: 
 *              type: object
 *              required: 
 *                  -   mobile
 *              properties: 
 *                  firstname: 
 *                      type: string
 *                      description: the user firstname for signUp/signIn
 *                  lastname: 
 *                      type: string
 *                      description: the user lastname for signUp/signIn
 *                  mobile: 
 *                      type: string
 *                      description: the user mobile for signUp/signIn
 *                  email: 
 *                      type: string
 *                      description: the user email for signUp/signIn
 *                  password: 
 *                      type: string
 *                      description: the user password for signUp/signIn
 *          Login:
 *              type: object
 *              required: 
 *                  -   mobile
 *                  -   password
 *              properties: 
 *                  mobile: 
 *                      type: string
 *                      description: the user mobile for Login
 *                  password: 
 *                      type: string
 *                      description: the password code
 *          refreshToken:
 *              type: object
 *              required: 
 *                  -   refreshToken
 *              properties: 
 *                  refreshToken:
 *                      type: string
 *                      description: the refreshToken
 */

/**
 * @swagger 
 *  /user/register: 
 *      post: 
 *          tags: [User-Authentication]
 *          summary: Login User In feacher mobile and password
 *          description: Login User In feacher mobile and password
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema: 
 *                          $ref: '#/components/schemas/Register'             
 *          responses: 
 *                  200:
 *                      description: OK
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/PublicDefinition'               
 */
/**
 * @swagger
 *  /user/login:
 *      post:
 *          tags: [User-Authentication]
 *          summary: check Login User In password Code with Mobile
 *          description: check Login  mobile and Password
 *          requestBody: 
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema: 
 *                          $ref: '#/components/schemas/Login'
 *          responses: 
 *              200:
 *                  description: OK
 *                  content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/definitions/PublicDefinition'
 *              
 */
/**
 * @swagger
 *  /user/refresh_token:
 *      post:
 *          tags: [User-Authentication]
 *          summary: check Login  mobile and Password
 *          description: check Login  mobile and Password
 *          requestBody: 
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema: 
 *                          $ref: '#/components/schemas/refreshToken'      
 *          responses: 
 *              200:
 *                  description: OK
 *                  content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/definitions/PublicDefinition'
 *              
 */