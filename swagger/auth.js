/**
 * @swagger
 * /auth/login:
 *  post:
 *    tags:
 *      - Auth
 *    summary: API use for user login..
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: body
 *        in: body
 *        required: true
 *        schema:
 *          type: object
 *          required: [ email, password ]
 *          properties:
 *            email:
 *              type: string
 *              description: title for post
 *              example: 'satendra@nimapinfotech.com'
 *            password:
 *              type: string
 *              description: content for post
 *              example: 1234567890
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *         description: Product
 *         schema:
 *           type: object
 *           description: not found
 *           properties:
 *             message:
 *               title: message
 *               type: string
 *               example: not found
 */

/**
 * @swagger
 * /auth/logout:
 *  post:
 *    tags:
 *      - Auth
 *    summary: API use for user login..
 *    security:
 *       - bearerAuth: []
 *    consumes:
 *      - application/json
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *         description: Product
 *         schema:
 *           type: object
 *           description: not found
 *           properties:
 *             message:
 *               title: message
 *               type: string
 *               example: not found
 */


/**
 * @swagger
 * /auth/password-reset-mail:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Forgot password (step 1)
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required: [ email ]
 *           properties:
 *             email:
 *               type: string
 *               description: email
 *               example: chin2@gmail.com
 *     responses:
 *       200:
 *         description: otp verified
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               title: message
 *               type: string
 *               example: success
 *       422:
 *         description: user not found
 *         schema:
 *           type: object
 *           description:  user not found
 *           properties:
 *             message:
 *               title: message
 *               type: string
 *               example: user not found
 */

/**
 * @swagger
 * /auth/reset-password/{token}:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Forgot password (step 2)
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: "token"
 *         in: "path"
 *         description: "Token of user"
 *         required: true
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required: [ newPassword ]
 *           properties:
 *             newPassword:
 *               type: string
 *               description: email
 *               example: chin2@gmail.com
 *     responses:
 *       200:
 *         description: otp verified
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               title: message
 *               type: string
 *               example: success
 *       422:
 *         description: user not found
 *         schema:
 *           type: object
 *           description:  user not found
 *           properties:
 *             message:
 *               title: message
 *               type: string
 *               example: user not found
 */