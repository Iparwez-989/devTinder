# authRouter
    - POST /signup
    - POST /login
    - POST /logout

# profileRouter
GET /profile
PATCH /editprofile
PATCH /editPassword

# userRouter
GET /user/connection
GET /user/feed
GET /user/request

# connectionRequestRouter
POST /request/send/like/:userID
POST /request/send/ignore/:userID
POST /request/review/accept/:requestId
POST /request/review/reject/:requestId

