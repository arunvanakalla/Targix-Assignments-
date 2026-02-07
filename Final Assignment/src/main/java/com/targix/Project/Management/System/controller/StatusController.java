package com.targix.Project.Management.System.controller;

import com.targix.Project.Management.System.dto.status.CreateStatusRequest;
import com.targix.Project.Management.System.dto.status.StatusResponse;
import com.targix.Project.Management.System.dto.status.UpdateStatusRequest;
import com.targix.Project.Management.System.service.StatusService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/statuses")
@PreAuthorize("hasAuthority('ADMIN')")
public class StatusController {

    private final StatusService statusService;

    public StatusController(StatusService statusService) {
        this.statusService = statusService;
    }

    @GetMapping
    public ResponseEntity<List<StatusResponse>> getAllStatuses() {
        return ResponseEntity.ok(statusService.getAllStatuses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<StatusResponse> getStatusById(@PathVariable Long id) {
        return ResponseEntity.ok(statusService.getStatusById(id));
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<StatusResponse> getStatusByName(@PathVariable String name) {
        return ResponseEntity.ok(statusService.getStatusByName(name));
    }

    @PostMapping
    public ResponseEntity<StatusResponse> createStatus(@RequestBody @Valid CreateStatusRequest request) {
        StatusResponse createdStatus = statusService.createStatus(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdStatus);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StatusResponse> updateStatus(@PathVariable Long id,
                                             @RequestBody @Valid UpdateStatusRequest request) {
        StatusResponse updatedStatus = statusService.updateStatus(id, request);
        return ResponseEntity.ok(updatedStatus);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStatus(@PathVariable Long id) {
        statusService.deleteStatus(id);
        return ResponseEntity.ok("Status deleted successfully");
    }
}

