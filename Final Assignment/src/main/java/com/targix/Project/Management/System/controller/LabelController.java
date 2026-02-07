package com.targix.Project.Management.System.controller;

import com.targix.Project.Management.System.dto.label.CreateLabelRequest;
import com.targix.Project.Management.System.dto.label.LabelResponse;
import com.targix.Project.Management.System.dto.label.UpdateLabelRequest;
import com.targix.Project.Management.System.service.LabelService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/labels")
@PreAuthorize("hasAuthority('ADMIN')")
public class LabelController {

    private final LabelService labelService;

    public LabelController(LabelService labelService) {
        this.labelService = labelService;
    }

    @GetMapping
    public ResponseEntity<List<LabelResponse>> getAllLabels() {
        return ResponseEntity.ok(labelService.getAllLabels());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LabelResponse> getLabelById(@PathVariable Long id) {
        return ResponseEntity.ok(labelService.getLabelById(id));
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<LabelResponse> getLabelByName(@PathVariable String name) {
        return ResponseEntity.ok(labelService.getLabelByName(name));
    }

    @PostMapping
    public ResponseEntity<LabelResponse> createLabel(@RequestBody @Valid CreateLabelRequest request) {
        LabelResponse createdLabel = labelService.createLabel(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdLabel);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LabelResponse> updateLabel(@PathVariable Long id,
                                             @RequestBody @Valid UpdateLabelRequest request) {
        LabelResponse updatedLabel = labelService.updateLabel(id, request);
        return ResponseEntity.ok(updatedLabel);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLabel(@PathVariable Long id) {
        labelService.deleteLabel(id);
        return ResponseEntity.ok("Label deleted successfully");
    }
}
