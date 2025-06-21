/**
* @swagger
* /user:
*   post:
*     tags:
*       - user
*     summary: Add user
*     security:
*       - bearerAuth: []
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         required: true
*         schema:
*           type: object
*           required: [ firstName , lastName , userName , mobileNumber ,email ]
*           properties:
*             firstName:
*               type: string
*               description: firstName
*               example: 'shrilal'
*             lastName:
*               type: string
*               description: lastName
*               example: 'mallah'
*             userName:
*               type: string
*               description: userName
*               example: 'Team Nimap'
*             email:
*               type: string
*               description: email
*               example: 'team@nimapinfotech.com'
*             password:
*               type: string
*               description: password
*               example: 'password'
*             mobileNumber:
*               type: string
*               description: mobileNumber
*               example: '8898766543'
*             role:
*               type: string
*               description: role
*               example: 'admin/user'
*     responses:
*       201:
*         description: user added
*         schema:
*           type: object
*           properties:
*             message:
*               title: message
*               type: string
*               example: success
*       422:
*         description: Failed to add user
*         schema:
*           type: object
*           description:  user
*           properties:
*             message:
*               title: message
*               type: string
*               example: failed to add user
*/
/** 
* @swagger
* /user:
*   get:
*     tags:
*       - user
*     name: Read all user 
*     summary: To read all user
*     security:
*       - bearerAuth: []
*     consumes:
*       - application/json
*     parameters:
*       - name: pageNumber
*         in: query
*         description: The page number for pagination
*         required: false
*         type: integer
*         example: 1
*       - name: limit
*         in: query
*         description: The number of forms to return per page
*         required: false
*         type: integer
*         example: 10
*       - name: search
*         in: query
*         description: A search term to filter forms by name or category
*         required: false
*         type: string
*         example: 'Operations'
*       - name: sortOrder
*         in: query
*         description: Sorting order (1 for ascending, default -1 for descending) 
*         required: false
*         type: number
*         example: '-1'
*       - name: team
*         in: query
*         description: filter by team
*         required: false
*         type: string
*         example: '671f3506191b4e9215276819'
*     responses:
*       200:
*         description: Data found
*         schema:
*           type: object
*           description: user data
*           properties:
*             alluserData:
*               title: data
*               description: user data
*               type: array
*       404:
*         description: Data not found
*         schema:
*           type: object
*           properties:
*             message:
*               title: message
*               type: string
*               example: Data not found
*/
/**
* @swagger
* /user/{id}:
*   get:
*     tags:
*       - user
*     summary: To get user by id
*     parameters:
*     - name: "id"
*       in: "path"
*       description: "Id of user to get"
*       required: true
*       type: "string"
*     security:
*       - bearerAuth: []
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: To get user by id.
*         schema:
*           type: object
*           properties:
*       404:
*         description: user
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
* /user/{id}:
*   put:
*     tags:
*       - user
*     summary: Update user by id
*     parameters:
*     - name: "id"
*       in: "path"
*       description: "Id of user to update"
*       required: true
*       type: "string"
*     - name: body
*       in: body
*       required: true
*       schema:
*         type: object
*         required: [ user]
*         properties:
*             firstName:
*               type: string
*               description: user
*               example: nimap
*             lastName:
*               type: string
*               description: user
*               example: infotech
*             userName:
*               type: string
*               description: user
*               example: nimap infotech
*             email:
*               type: string
*               description: user
*               example: name@nimapinfotech.com
*             password:
*               type: string
*               description: user
*               example: 123456789
*             mobileNumber:
*               type: string
*               description: user
*               example: 8092678954
*             role:
*               type: string
*               description: user
*               example: 66c7177e22d9845e47bd0fb1
*     security:
*       - bearerAuth: []
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: To update user by id.
*         schema:
*           type: object
*           properties:
*       404:
*         description: user
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
* /user/{id}:
*   delete:
*     tags:
*       - user
*     summary: Delete user by id
*     parameters:
*     - name: "id"
*       in: "path"
*       description: "Id of user to be deleted"
*       required: true
*       type: "string"
*     security:
*       - bearerAuth: []
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: user is deleted by id.
*         schema:
*           type: object
*           properties:
*       404:
*         description: user
*         schema:
*           type: object
*           description: not found
*           properties:
*             message:
*               title: message
*               type: string
*               example: not found
*/
