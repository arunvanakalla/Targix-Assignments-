package com.targix.Project.Management.System.controller;

import com.targix.Project.Management.System.dto.ticket.*;
import com.targix.Project.Management.System.dto.user.ResetPasswordRequest;
import com.targix.Project.Management.System.dto.user.UserResponse;
import com.targix.Project.Management.System.service.TicketService;
import com.targix.Project.Management.System.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/admin")
//@PreAuthorize("hasAuthority('ADMIN')")
public class AdminController {

    private final UserService userService;
    private final TicketService ticketService;

    AdminController(UserService userService, TicketService ticketService) {
        this.userService = userService;
        this.ticketService = ticketService;
    }

    @GetMapping("/pending-users")
    public ResponseEntity<List<UserResponse>> getPendingUsers() {
        return ResponseEntity.ok(userService.getPendingUsers());
    }

    @PutMapping("/approve/{id}")
    public ResponseEntity<String> approveUser(@PathVariable Long id) {
        userService.approve(id);
        return ResponseEntity.ok("User approved successfully");
    }

    @PutMapping("/approve-admin/{id}")
    public ResponseEntity<String> approveAdmin(@PathVariable Long id) {
        userService.approveAdmin(id);
        return ResponseEntity.ok("Admin approved successfully");
    }

    @PutMapping("/reject/{id}")
    public ResponseEntity<String> rejectUser(@PathVariable Long id) {
        userService.reject(id);
        return ResponseEntity.ok("User rejected successfully");
    }

//    active users only
    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id, Principal principal) {
        userService.deleteUser(id, principal.getName());
        return ResponseEntity.ok("User deleted successfully");
    }

    @PutMapping("/users/{id}/password")
    public ResponseEntity<String> resetUserPassword(@PathVariable Long id,
                                                     @RequestBody @Valid ResetPasswordRequest request,
                                                     Principal principal) {
        String message = userService.resetUserPassword(id, request, principal.getName());
        return ResponseEntity.ok(message);
    }

    @PostMapping("/tickets")
    public ResponseEntity<TicketResponse> createTicket(@RequestBody @Valid CreateTicketRequest request,
                                                       Principal principal) {
        TicketResponse createdTicket = ticketService.create(request, principal.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTicket);
    }

    @PutMapping("/tickets/{id}")
    public ResponseEntity<TicketResponse> updateTicket(@PathVariable Long id,
                                                       @RequestBody @Valid UpdateTicketRequest request,
                                                       Principal principal) {
        TicketResponse updatedTicket = ticketService.update(id, request, principal.getName());
        return ResponseEntity.ok(updatedTicket);
    }

    @DeleteMapping("/tickets/{id}")
    public ResponseEntity<String> deleteTicket(@PathVariable Long id) {
        ticketService.delete(id);
        return ResponseEntity.ok("Ticket deleted successfully");
    }

    @PostMapping("/users/{userId}/transfer-tickets")
    public ResponseEntity<String> transferUserTickets(@PathVariable Long userId,
                                                      @RequestBody @Valid TransferTicketRequest request,
                                                      Principal principal){
        int transferredCount = ticketService.transferAllTickets(userId, request.getTargetUserId(), principal.getName());
        return ResponseEntity.ok("Successfully transferred " + transferredCount + " ticket(s)");
    }

    @GetMapping("/users/for-assignment")
    public ResponseEntity<List<UserResponse>> getUsersForAssignment() {
        return ResponseEntity.ok(userService.getUsersForAssignment());
    }

    @GetMapping("tickets/un-assigned")
    public ResponseEntity<List<TicketResponse>> getAllUnAssignedTickets() {
        List<TicketResponse> tickets = ticketService.getAllUnAssignedTickets();
        return ResponseEntity.ok(tickets);
    }

    @PutMapping("tickets/{id}/assign")
    public ResponseEntity<TicketResponse> assignUserToTicket(@RequestBody AssignUserRequest request,
                                                             @PathVariable Long id,Principal principal) {
        TicketResponse response = ticketService.assignUserToTicket(request,id,principal.getName());
        return ResponseEntity.ok(response);
    }
}
