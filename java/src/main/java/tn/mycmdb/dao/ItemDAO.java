package tn.mycmdb.dao;

import com.mongodb.client.FindIterable;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.mycmdb.mongo.MongoConnector;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ItemDAO implements DAO<Document> {

    @Autowired
    private MongoConnector mongodbConnection;
    private final String collectionName = "item";

    @Override
    public List<Document> getAll() {
        List<Document> result = new ArrayList<>();
        System.out.println("HashCode: " + mongodbConnection.hashCode());

        FindIterable<Document> findIterable = mongodbConnection.getCollection(collectionName).find();
        findIterable.into(result);

        return result;
    }

    @Override
    public Optional<Document> get(String id) {
        System.out.println("HashCode: " + mongodbConnection.hashCode());
        Optional<Document> result;
        try {
            ObjectId objectId = new ObjectId(id);
            result = Optional.ofNullable(mongodbConnection.getCollection(collectionName).find(new Document("_id", objectId)).first());
        } catch (Exception e) {
            System.out.println("ERROR: Wrong ObjectId");
            result = Optional.empty();
        }
        return result;
    }

    @Override
    public void save(Document document) {
        System.out.println("HashCode: " + mongodbConnection.hashCode());
        try {
            mongodbConnection.getCollection(collectionName).insertOne(document);
        }
        catch (Exception e){
            System.out.println("ERROR: Save failed");
        }
    }

    @Override
    public boolean update(String id, Document document) {
        try {
            ObjectId objectId = new ObjectId(id);
            mongodbConnection.getCollection(collectionName).replaceOne(new Document("_id", objectId), document);
            return true;
        }
        catch (Exception e){
            System.out.println(e);
            System.out.println("ERROR: Update failed");
            return false;
        }
    }

    @Override
    public boolean delete(String id) {
        try {
            ObjectId objectId = new ObjectId(id);
            DeleteResult deleteResult = mongodbConnection.getCollection(collectionName).deleteOne(new Document("_id", objectId));
            return deleteResult.getDeletedCount() > 0;
        } catch (Exception e) {
            System.out.println("ERROR: Delete failed");
            return false;
        }
    }
}
