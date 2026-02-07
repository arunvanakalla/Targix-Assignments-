package com.targix.Project.Management.System.dto.attachment;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateAttachmentRequest {

    @NotBlank(message = "URL is required")
    private String url;

    @NotBlank(message = "Type is required")
    private String type;
}


