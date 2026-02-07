package com.targix.Project.Management.System.controller;

import com.targix.Project.Management.System.dto.role.CreateRoleRequest;
import com.targix.Project.Management.System.dto.role.RoleResponse;
import com.targix.Project.Management.System.dto.role.UpdateRoleRequest;
import com.targix.Project.Management.System.service.RoleService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
@PreAuthorize("hasAuthority('ADMIN')")
public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping
    public ResponseEntity<List<RoleResponse>> getAllRoles() {
        return ResponseEntity.ok(roleService.getAllRoles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoleResponse> getRoleById(@PathVariable Long id) {
        return ResponseEntity.ok(roleService.getRoleById(id));
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<RoleResponse> getRoleByName(@PathVariable String name) {
        return ResponseEntity.ok(roleService.getRoleByName(name));
    }

    @PostMapping
    public ResponseEntity<RoleResponse> createRole(@RequestBody @Valid CreateRoleRequest request) {
        RoleResponse createdRole = roleService.createRole(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRole);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoleResponse> updateRole(@PathVariable Long id,
                                                   @RequestBody @Valid UpdateRoleRequest request) {
        RoleResponse updatedRole = roleService.updateRole(id, request);
        return ResponseEntity.ok(updatedRole);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRole(@PathVariable Long id) {
        roleService.deleteRole(id);
        return ResponseEntity.ok("Role deleted successfully");
    }
}
