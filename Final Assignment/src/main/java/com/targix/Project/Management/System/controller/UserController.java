package com.targix.Project.Management.System.controller;

import com.targix.Project.Management.System.dto.comment.CommentResponse;
import com.targix.Project.Management.System.dto.comment.CreateCommentRequest;
import com.targix.Project.Management.System.dto.ticket.TicketResponse;
import com.targix.Project.Management.System.dto.ticket.UpdateTicketStatusRequest;
import com.targix.Project.Management.System.dto.user.ChangePasswordRequest;
import com.targix.Project.Management.System.dto.user.UpdateUserRequest;
import com.targix.Project.Management.System.dto.user.UserResponse;
import com.targix.Project.Management.System.service.CommentService;
import com.targix.Project.Management.System.service.TicketService;
import com.targix.Project.Management.System.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/users")
@PreAuthorize("isAuthenticated()")
public class UserController {

    private final UserService userService;
    private final TicketService ticketService;
    private final CommentService commentService;

    public UserController(UserService userService, TicketService ticketService, CommentService commentService) {
        this.userService = userService;
        this.ticketService = ticketService;
        this.commentService = commentService;
    }

    @GetMapping("/profile")
    public ResponseEntity<UserResponse> getUserProfile(Principal principal) {
        return ResponseEntity.ok(userService.getUserProfile(principal.getName()));
    }

    @PostMapping("/profile/avatar")
    public ResponseEntity<UserResponse> uploadAvatar(@RequestParam("file") MultipartFile file,
                                                     Principal principal) {
        UserResponse updated = userService.uploadAvatar(file, principal.getName());
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(@PathVariable Long id,
                                                   @RequestBody @Valid UpdateUserRequest request,
                                                   Principal principal) {
        UserResponse updatedUser = userService.updateUser(id, request, principal.getName());
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/profile/password")
    public ResponseEntity<String> changePassword(@RequestBody @Valid ChangePasswordRequest request,
                                                 Principal principal) {
        return ResponseEntity.ok(userService.changePassword(request, principal.getName()));
    }

    @GetMapping("/tickets")
    public ResponseEntity<List<TicketResponse>> getTickets(
            @RequestParam(required = false) Long assignedToUserId,
            @RequestParam(required = false) Long createdByUserId,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Long labelId,
            @RequestParam(required = false, defaultValue = "false") Boolean myAssigned,
            Principal principal
    ) {
        UserResponse currentUser = userService.getUserProfile(principal.getName());
        Long currentUserId = currentUser.getId();

        boolean isAdmin = currentUser.getRole() != null && currentUser.getRole().getName().equals("ADMIN");

        if (myAssigned != null && myAssigned && isAdmin) {
            return ResponseEntity.ok(List.of());
        }

        if (myAssigned != null && myAssigned) {
            assignedToUserId = currentUserId;
        }

        List<TicketResponse> tickets = ticketService.getTicketsWithFilters(
                assignedToUserId,
                createdByUserId,
                status,
                labelId,
                myAssigned,
                currentUserId
        );

        return ResponseEntity.ok(tickets);
    }

    @GetMapping("/tickets/{id}")
    public ResponseEntity<TicketResponse> getTicketById(@PathVariable Long id) {
        return ResponseEntity.ok(ticketService.getTicketById(id));
    }

    @PutMapping("/tickets/{id}/status")
    public ResponseEntity<TicketResponse> updateTicketStatus(@PathVariable Long id,
                                                            @RequestBody @Valid UpdateTicketStatusRequest request,
                                                            Principal principal) {
        TicketResponse updatedTicket = ticketService.updateStatus(id, request.getStatus(), principal.getName());
        return ResponseEntity.ok(updatedTicket);
    }

    @GetMapping("/tickets/{ticketId}/comments")
    public ResponseEntity<List<CommentResponse>> getCommentsByTicket(@PathVariable Long ticketId) {
        return ResponseEntity.ok(commentService.getCommentsByTicket(ticketId));
    }

    @PostMapping("/tickets/{ticketId}/comments")
    public ResponseEntity<CommentResponse> createComment(@PathVariable Long ticketId,
                                                         @RequestBody @Valid CreateCommentRequest request,
                                                         Principal principal) {
        CommentResponse createdComment = commentService.createComment(ticketId, request, principal.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(createdComment);
    }
}