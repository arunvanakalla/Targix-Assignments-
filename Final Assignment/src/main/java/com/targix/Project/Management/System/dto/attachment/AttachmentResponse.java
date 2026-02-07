package com.targix.Project.Management.System.dto.attachment;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AttachmentResponse {

    private Long id;
    private Long ticketId;
    private String url;
    private String type;
}


