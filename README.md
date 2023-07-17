# Getting Started

## Front-end:

[localhost:3000](http://localhost:3000)

```
cd front-end
npm i
npm run dev
```

## Backend:

```
docker compose up d --build
```

## Admin:

[localhost:8000/admin](http://localhost:8000/admin)

Superuser

username: root

password: root

Staff Login

username: Staff ID

password: init+Staff ID

## REST API

localhost:8000/api

Requirements:

- Header must include Django Token when fetching the data from front-end

SU Staffs API

| API  | Params | Data Type | Description |
| --- | --- | --- | --- |
| /su_staffs | - | - | return a list of all su_staffs data |
| /su_staffs | dpet_id | string | return a list of all su_staffs data under the Department ID |
| /su_staffs | school_id | string | return a list of all su_staffs data under the School ID |
| /su_staffs | staff_id | string | return the su_staffs data with the exact staff_id |

Publications API

| API  | Params | Data Type | Description |
| --- | --- | --- | --- |
| /publications | - | - | return a list of all publications data |
| /publications | latest_publication | int | return a list of latest publication order by date |
| /publications | published_year_after | date (yyyy-mm-dd) | return a list of all publications after the given date |
| /publications | published_year_before | date (yyyy-mm-dd) | return a list of all publications before the given date |
| /publications | title | string | return the publication data with the exact title |
| /publications | id | int | return the exact publication base on the id |

Grants API

| API  | Params | Data Type | Description |
| --- | --- | --- | --- |
| /grants | - | - | return a list of all grants data |
| /grants | latest_grant | int | return a list of latest grant order by date |
| /grants | project_start_date_after | date (yyyy-mm-dd) | return a list of all grant after the given date |
| /grants | project_start_date_before | date (yyyy-mm-dd) | return a list of all publications before the given date |
| /grants | project_title | string | return the grant data with the exact project title |
| /grants | project_code | int | return the exact grant base on the project_code |
