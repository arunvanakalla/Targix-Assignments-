package com.targix.Project.Management.System.controller;

import com.targix.Project.Management.System.dto.attachment.AttachmentResponse;
import com.targix.Project.Management.System.dto.attachment.CreateAttachmentRequest;
import com.targix.Project.Management.System.dto.attachment.UpdateAttachmentRequest;
import com.targix.Project.Management.System.service.AttachmentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/attachments")
public class AttachmentController {

    private final AttachmentService attachmentService;

    public AttachmentController(AttachmentService attachmentService) {
        this.attachmentService = attachmentService;
    }

    @GetMapping("/ticket/{ticketId}")
    public ResponseEntity<List<AttachmentResponse>> getAttachmentsByTicket(@PathVariable Long ticketId) {
        return ResponseEntity.ok(attachmentService.getAttachmentsByTicket(ticketId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AttachmentResponse> getAttachmentById(@PathVariable Long id) {
        return ResponseEntity.ok(attachmentService.getAttachmentById(id));
    }

    @PostMapping("/ticket/{ticketId}")
    public ResponseEntity<AttachmentResponse> createAttachment(@PathVariable Long ticketId,
                                                               @RequestBody @Valid CreateAttachmentRequest request,
                                                               Principal principal) {
        AttachmentResponse createdAttachment = attachmentService.createAttachment(ticketId, request, principal.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAttachment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AttachmentResponse> updateAttachment(@PathVariable Long id,
                                                               @RequestBody @Valid UpdateAttachmentRequest request,
                                                               Principal principal) {
        AttachmentResponse updatedAttachment = attachmentService.updateAttachment(id, request, principal.getName());
        return ResponseEntity.ok(updatedAttachment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAttachment(@PathVariable Long id, Principal principal) {
        attachmentService.deleteAttachment(id, principal.getName());
        return ResponseEntity.ok("Attachment deleted successfully");
    }
}

