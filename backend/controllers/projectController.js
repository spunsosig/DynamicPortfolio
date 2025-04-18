const pool = require('../config/database');
const logger = require('../utils/logger');

exports.getProjects = async (req, res) => {
    try {
        const [projects] = await pool.execute(
            'SELECT * FROM projects WHERE is_archived = false ORDER BY created_at DESC'
        );
        res.json(projects);
    } catch (error) {
        logger.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
};

exports.addProject = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const { title, description, blogContent } = req.body;
        const mainImage = req.files[0]?.filename;
        const additionalImages = req.files.slice(1).map(file => file.filename);

        await connection.beginTransaction();

        const [result] = await connection.execute(
            'INSERT INTO projects (title, description, main_image, blog_content, additional_images) VALUES (?, ?, ?, ?, ?)',
            [title, description, mainImage, blogContent, JSON.stringify(additionalImages)]
        );

        await connection.commit();
        res.status(201).json({ 
            message: 'Project added successfully',
            projectId: result.insertId 
        });
    } catch (error) {
        await connection.rollback();
        logger.error('Error adding project:', error);
        res.status(500).json({ error: 'Failed to add project' });
    } finally {
        connection.release();
    }
};

exports.updateProject = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const { id } = req.params;
        const { title, description, blogContent } = req.body;
        
        await connection.beginTransaction();

        if (req.files.length > 0) {
            const mainImage = req.files[0].filename;
            const additionalImages = req.files.slice(1).map(file => file.filename);
            
            await connection.execute(
                'UPDATE projects SET title = ?, description = ?, main_image = ?, blog_content = ?, additional_images = ? WHERE id = ?',
                [title, description, mainImage, blogContent, JSON.stringify(additionalImages), id]
            );
        } else {
            await connection.execute(
                'UPDATE projects SET title = ?, description = ?, blog_content = ? WHERE id = ?',
                [title, description, blogContent, id]
            );
        }

        await connection.commit();
        res.json({ message: 'Project updated successfully' });
    } catch (error) {
        await connection.rollback();
        logger.error('Error updating project:', error);
        res.status(500).json({ error: 'Failed to update project' });
    } finally {
        connection.release();
    }
};

exports.deleteProject = async (req, res) => {
    try {
        await pool.execute(
            'UPDATE projects SET is_archived = true WHERE id = ?',
            [req.params.id]
        );
        res.json({ message: 'Project archived successfully' });
    } catch (error) {
        logger.error('Error archiving project:', error);
        res.status(500).json({ error: 'Failed to archive project' });
    }
};