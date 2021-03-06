# Review Service

This service is setup to run in Docker containers. To run locally, follow instructions below.

## Instructions For Running Locally
1. Install Docker on your local machine https://docs.docker.com/get-docker/
2. Install Docker Compose should your machine require extra steps https://docs.docker.com/compose/install/
3. Clone down repository: "git clone https://github.com/sdc-perlman/review-service.git"
4. From the root directory of the repository in the terminal, run "docker-compose up --build app mongo"

```console
docker-compose up --build app mongo
```

By specifiying the service, we are choosing which image to create containers of. If we only ran "docker-compose up", docker will assume that we want containers to run for all images


## Seeding the Database
1. Run the data generation script. You can adjust how many records are produced by changing the value of the 'iterations' variable in backend/dataGeneration/generateDump.js. Each iteration will produce 250000 records

```console
npm run data-generate
```

2. After the data is created, a shell script should execute that concatenates all files that were generated. If this command does NOT
	execute due to file-permission reasons, then there are two things you can try:
	1. You can "cd" into the "backend/dumps" directory, and run "chmod 777 catScript.sh" to give
		your machine higher permissions, and then run "npm run shell"
	2. Another option is to copy the command that was logged to the console when the data was generated. It is the same exact command 		that the "npm run shell" script is supposed to execute, but instead now you would just be executing it directly in your terminal
	3. I personally recommend trying the first option first

### Option 1
```console
cd dumps
chmod 777 catScript.sh
npm run shell
```

### Option 2
From the rootdir, paste the command that printed to your terminal. This command will vary depending on how many iterations you choose to run in "server/dataGeneration/generateDump.js". It should look like the following below:
```console
cat dumps/head.sql dumps/copyReviews.sql dumps/reviewsBody0.sql dumps/copyUsers.sql dumps/usersBody0.sql dumps/foot.sql > dumps/dump.sql
```

4. Once the "dump.sql" file is created, from the root directory of the project in your terminal, run the command "docker-compose --build up pg". This will read the "pg" service in the "docker-compose.yaml" file and only build that image and run a container, while ignoring the other services. Once the image is build, the Postgres container will see the "dump.sql" file and begin copying the information to the database. This process should take very little time if you set the number of iterations to 0 or 1 earlier. You will notice the creation of another folder called "pg" in the root directory of the project, which is just a volume to persist the data that was seeded so that you do not need to seed the database when stopping and restarting a Postgres container.


### Running the Postgres container (do this before the next step)
From the rootdir, enter in your terminal
```console
docker-compose --build up pg
```

NOTE: The initial copying of the dump.sql may take a little time, but all subsequent containers will be instant so long as the volume has a reference to a folder on your local machine. To stop and delete the container, enter:
```console
docker-compose down
```

### Running the Repository 
To run each aspect of the repository in containers, just run
```console
docker-compose --build up pg server client
```

NOTE: Postgres has the "out-of-box" capability of generating a dump.sql file to back up existing databases. The entire strategy of this data generation script was to create a file using the same syntax as a native pg_dump file, as these scripts follow several recommendations from the Postgres documentation on speeding up the process of seeding large datasets. More can be read [here](https://www.postgresql.org/docs/9.1/populate.html)

