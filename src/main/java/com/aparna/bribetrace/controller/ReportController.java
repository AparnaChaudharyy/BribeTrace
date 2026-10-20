package com.aparna.bribetrace.controller;

import com.aparna.bribetrace.entity.Report;
import com.aparna.bribetrace.repository.ReportRepository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportRepository reportRepository;

    public ReportController(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    // Submit a new report
    @PostMapping
    public Report createReport(@RequestBody Report report) {
        return reportRepository.save(report);
    }

    // Get total number of reports
    @GetMapping("/stats")
    public Map<String, Long> getStats() {
        return Map.of("totalReports", reportRepository.count());
    }

    // Analyze reports by sector
    @GetMapping("/by-sector")
    public List<Map<String, Object>> getReportsBySector() {
        return convertToAnalysisList(reportRepository.countBySector());
    }

    // Analyze reports by location
    @GetMapping("/by-location")
    public List<Map<String, Object>> getReportsByLocation() {
        return convertToAnalysisList(reportRepository.countByLocation());
    }

    // Analyze reports by bribe type
    @GetMapping("/by-type")
    public List<Map<String, Object>> getReportsByType() {
        return convertToAnalysisList(reportRepository.countByBribeType());
    }

    private List<Map<String, Object>> convertToAnalysisList(
            List<Object[]> rows) {

        List<Map<String, Object>> result = new ArrayList<>();

        for (Object[] row : rows) {
            Map<String, Object> item = new LinkedHashMap<>();
            item.put("label", row[0]);
            item.put("count", row[1]);
            result.add(item);
        }

        return result;
    }
}
