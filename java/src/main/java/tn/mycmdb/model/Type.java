package tn.mycmdb.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Data
@Document(collection = "type")
public class Type {
    @Id
    private String id;
    private String name;
    private List<Map<String, String>> info;
    private List<Map<String, String>> structure;
}
