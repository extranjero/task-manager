# Task manager REST API 
This is the task manager rest api. You can create new servers and run command on them 
Results will be stored in db for later statistics.

### Dependencies

- [Nodejs >= 6.0](https://nodejs.org/en/)
- [Mongodb >= 2.6](https://nodejs.org/en/)


### Setup 
- clone repo
- run command ```npm install```
- create config file config.json in the project root
- create admin user node ./scripts/create_admin.js 

### Sample config.json
```
{
    "port": 4000, // listen port
    "secret": "some_secret", // jwt secret string
    "logger": {
        "error_file_name": "/var/log/task_manager/error.log", // error log file path
        "info_file_name": "/var/log/task_manager/info.log" // info log file path
    },
    "ssh": { // ssh configs for tests 
        "port": 22 
        "host": "localhost"
        "user": "ubuntu" 
        "password": "password" 
    }
}
```

### Commands 
```
npm test // for running tests (now tested only on ubuntu 16.04)
npm run // for running server
```

### API
Api is rest json and return [jsend](https://labs.omniti.com/labs/jsend) response 
Api now supports only json format
Params with * is required

#### Users

##### POST /api/v1/users/auth
Authenticate user with email and password

Params: 
| Field | Type | Where | Desc |
--- |---| ---
| email* | string | body | user email |
| password* | string | body | user password |

##### GET /api/v1/users/auth
Get all users


#### Servers

##### POST /api/v1/servers/
Create new server

Params: 
| Field | Type | Where | Desc |
--- |---| ---
| name* | string | body | server name |
| host* | string | body | ssh host|
| userName* | string | body | ssh user name |
| password* | string | body | user | ssh password |
| port | int | body | user | default - 22. ssh port |
| keyFile | string | body | user | ssh key file (*.pem) |

##### GET /api/v1/servers/:id
Get the server

##### GET /api/v1/servers
Get all servers

##### PUT /api/v1/servers/:id
Update the server

Params: 
| Field | Type | Where | Desc |
--- |---| ---
| name* | string | body | server name |
| host* | string | body | ssh host|
| userName* | string | body | ssh user name |
| password* | string | body | user | ssh password |
| port* | int | body | user | default - 22. ssh port |
| keyFile* | string | body | user | ssh key file (*.pem) |

##### DELETE /api/v1/servers/:id
DELETE the server

#### Commands 

##### POST /api/v1/commands/
Run commands on servers

Params: 
| Field | Type | Where | Desc |
--- |---| ---
| name* | string | body | command name |
| command* | string | body | command to run servers |
| serverIds* | []string | body | ids of the server to run the command |

##### GET /api/v1/commands/:id
Get the command details

##### GET /api/v1/commands/
Get all commands 

##### DELETE /api/v1/commands/:id
DELETE the command 

### TODO

- Frontend for the API
- Swagger 
- User authentiation check middleware 
- Run commands through queue (ex: Rabbitmq) 
- Validation on routes



