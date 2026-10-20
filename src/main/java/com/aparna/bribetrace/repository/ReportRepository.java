package com.aparna.bribetrace.repository;

import com.aparna.bribetrace.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {

    @Query("SELECT r.sector, COUNT(r) FROM Report r GROUP BY r.sector")
    List<Object[]> countBySector();

    @Query("SELECT r.location, COUNT(r) FROM Report r GROUP BY r.location")
    List<Object[]> countByLocation();

    @Query("SELECT r.bribeType, COUNT(r) FROM Report r GROUP BY r.bribeType")
    List<Object[]> countByBribeType();
}
