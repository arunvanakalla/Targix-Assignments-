erDiagram

    USERS {
        bigint id PK
        varchar username
        varchar email
        varchar password
        enum status
        text bio
        varchar display_picture
        bigint role_id FK
    }

    ROLES {
        bigint id PK
        varchar name
    }

    TICKETS {
        bigint id PK
        varchar title
        text description
        datetime created_at
        datetime updated_at
        bigint created_by FK
        bigint assigned_to FK
        bigint updated_by FK
        bigint label_id FK
        bigint status_id FK
    }

    STATUS {
        bigint id PK
        varchar name
    }

    LABELS {
        bigint id PK
        varchar name
    }

    COMMENTS {
        bigint id PK
        text content
        datetime created_at
        bigint author_id FK
        bigint ticket_id FK
    }

    ATTACHMENTS {
        bigint id PK
        varchar type
        varchar url
        bigint ticket_id FK
    }

    %% Relationships
    ROLES ||--o{ USERS : has
    USERS ||--o{ TICKETS : creates
    USERS ||--o{ TICKETS : assigned_to
    USERS ||--o{ TICKETS : updates

    STATUS ||--o{ TICKETS : has
    LABELS ||--o{ TICKETS : categorized_as

    USERS ||--o{ COMMENTS : writes
    TICKETS ||--o{ COMMENTS : has

    TICKETS ||--o{ ATTACHMENTS : contains
