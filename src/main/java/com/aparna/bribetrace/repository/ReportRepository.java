package com.aparna.bribetrace.repository;

import com.aparna.bribetrace.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long> {
}