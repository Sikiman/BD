package tn.mycmdb.mongo;

import com.mongodb.MongoClientSettings;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Arrays;

@Component
@Scope("singleton")
public class MongoConnector {
    @Value("${mongodb.host}")
    private String host;
    @Value("${mongodb.port}")
    private int port;
    @Value("${mongodb.database}")
    private String database;
    @Value("${mongodb.authentication-database}")
    private String auth;
    @Value("${mongodb.username}")
    private String username;
    @Value("${mongodb.password}")
    private String password;

    public static final String ANSI_RESET = "\u001B[0m";
    public static final String ANSI_RED = "\u001B[31m";
    public static final String ANSI_GREEN = "\u001B[32m";

    private static MongoClient instance = null;

    @PostConstruct
    public void init() throws InstantiationException {
        if (instance == null) {
            MongoCredential credential = MongoCredential.createCredential(username, auth, password.toCharArray());
            instance = MongoClients.create(
                    MongoClientSettings.builder()
                            .applyToClusterSettings(builder ->
                                    builder.hosts(Arrays.asList(new ServerAddress(host, port))))
                            .credential(credential)
                            .build());
            System.out.println(ANSI_GREEN + "Instance created" + ANSI_RESET);
        } else {
            throw new InstantiationException(ANSI_RED + "Connector Instance Already Exists" + ANSI_RESET);
        }
    }

    public MongoConnector() {
        System.out.println(ANSI_GREEN + "MongoConnector initialized" + ANSI_RESET);
        System.out.println(this.hashCode());
    }

    public MongoCollection<Document> getCollection(String name) {
        return instance.getDatabase(database).getCollection(name);
    }
}
