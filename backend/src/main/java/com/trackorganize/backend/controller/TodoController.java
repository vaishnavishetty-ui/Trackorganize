package com.trackorganize.backend.controller;

import com.trackorganize.backend.model.Todo;
import com.trackorganize.backend.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:5173")
public class TodoController {

    @Autowired
    private TodoRepository todoRepository;

    // Fetch all tasks
    @GetMapping
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    // Fetch single task details by ID
    @GetMapping("/{id}")
    public Todo getTodoById(@PathVariable Long id) {
        return todoRepository.findById(id).orElseThrow();
    }

    // Fetch dashboard stats dynamically
    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        List<Todo> todos = todoRepository.findAll();
        long total = todos.size();
        long completed = todos.stream().filter(Todo::isCompleted).count();
        long pending = total - completed;
        int progress = total > 0 ? (int) Math.round(((double) completed / total) * 100) : 0;

        Map<String, Object> stats = new HashMap<>();
        stats.put("total", total);
        stats.put("completed", completed);
        stats.put("pending", pending);
        stats.put("progress", progress);
        return stats;
    }

    // Create task
    @PostMapping
    public Todo createTodo(@RequestBody Todo todo) {
        return todoRepository.save(todo);
    }

    // Update entire task
    @PutMapping("/{id}")
    public Todo updateTodo(@PathVariable Long id, @RequestBody Todo todoDetails) {
        Todo todo = todoRepository.findById(id).orElseThrow();
        todo.setTitle(todoDetails.getTitle());
        todo.setDescription(todoDetails.getDescription());
        todo.setPriority(todoDetails.getPriority());
        todo.setDueDate(todoDetails.getDueDate());
        todo.setTime(todoDetails.getTime());
        todo.setCategory(todoDetails.getCategory());
        todo.setCompleted(todoDetails.isCompleted());
        return todoRepository.save(todo);
    }

    // Delete task
    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        todoRepository.deleteById(id);
    }
}