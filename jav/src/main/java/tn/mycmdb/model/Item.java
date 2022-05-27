package tn.mycmdb.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Data
@Document(collection = "item")
public class Item {
    @Id
    private String id;
    private String typeId;
    private String name;
    private String status;
    private Map<String, String> info;
}
